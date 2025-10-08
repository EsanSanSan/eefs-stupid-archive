# Prompt the user for the input MP4 file
read -p "Enter the path to the input MP4 file: " input
read -p "Enter the size: " scale
read -p "Enter the fps: " fpss

# Output GIF file (same name as input but with .gif extension)
output="${input%.*}.gif"

# Generate a color palette with BT.709 conversion and better stats
ffmpeg -i "$input" -vf "fps=$fpss,scale=$scale:-1:flags=lanczos+accurate_rnd:out_color_matrix=bt709:out_range=tv,palettegen=stats_mode=diff" -y palette.png

# Use the palette to create the GIF with proper BT.709 colors
ffmpeg -i "$input" -i palette.png -filter_complex "[0:v]fps=$fpss,scale=$scale:-1:flags=lanczos+accurate_rnd:out_color_matrix=bt709:out_range=tv[p];[p][1:v]paletteuse=dither=floyd_steinberg" -y "$output"

# Clean up the palette file
rm palette.png

echo "GIF created: $output"
