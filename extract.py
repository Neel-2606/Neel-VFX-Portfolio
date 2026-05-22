import cv2
import os
import math

video_path = 'public/dragon.mp4'
output_dir = 'public/frames'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
print(f"Total frames in video: {total_frames} at {fps} FPS")

TARGET_FRAMES = 800

# Use exact mathematical spacing to ensure the very last frame of the video is the 800th frame
# This prevents cutting off the ending
indices = [int(math.floor(i * (total_frames - 1) / (TARGET_FRAMES - 1))) for i in range(TARGET_FRAMES)]
indices_set = set(indices)

print(f"Extracting exactly {TARGET_FRAMES} frames uniformly across the entire {total_frames} frames.")

frame_count = 0
saved_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    if frame_count in indices_set:
        # We might have multiple indices hitting the same frame_count if total_frames < TARGET_FRAMES,
        # but here total_frames > TARGET_FRAMES, so it's fine.
        # Actually, let's just count how many times this frame_count appears in indices
        times_to_save = indices.count(frame_count)
        
        frame_resized = cv2.resize(frame, (1280, 720), interpolation=cv2.INTER_AREA)
        
        for _ in range(times_to_save):
            if saved_count >= TARGET_FRAMES:
                break
            output_path = os.path.join(output_dir, f'frame_{saved_count:04d}.webp')
            cv2.imwrite(output_path, frame_resized, [cv2.IMWRITE_WEBP_QUALITY, 55])
            saved_count += 1
            
            if saved_count % 100 == 0:
                print(f"Extracted {saved_count}/{TARGET_FRAMES} frames...")
                
    frame_count += 1

cap.release()
print("Extraction complete! Extracted", saved_count, "frames.")
