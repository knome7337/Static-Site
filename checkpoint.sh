#!/bin/bash

# Create checkpoint directory with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
CHECKPOINT_DIR="checkpoints/checkpoint_$TIMESTAMP"
mkdir -p "$CHECKPOINT_DIR"

# Copy all project files to checkpoint directory
cp -r src "$CHECKPOINT_DIR/"
cp -r public "$CHECKPOINT_DIR/"
cp package.json "$CHECKPOINT_DIR/"
cp README.md "$CHECKPOINT_DIR/"

# Create a restore script
cat > "$CHECKPOINT_DIR/restore.sh" << 'EOF'
#!/bin/bash

# Restore files from checkpoint
cp -r src/* ../src/
cp -r public/* ../public/
cp package.json ../
cp README.md ../

echo "Project restored from checkpoint!"
EOF

chmod +x "$CHECKPOINT_DIR/restore.sh"

echo "Checkpoint created at: $CHECKPOINT_DIR"
echo "To restore, run: ./$CHECKPOINT_DIR/restore.sh" 