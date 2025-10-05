#!/bin/bash

# Project Backup Script
# Creates a timestamped backup of the current project state

PROJECT_DIR="$(pwd)"
PROJECT_NAME="$(basename "$PROJECT_DIR")"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR="$HOME/backups"
BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create the backup
echo "Creating backup of $PROJECT_NAME..."
tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='__pycache__' \
    --exclude='*.pyc' \
    --exclude='.DS_Store' \
    --exclude='dist' \
    --exclude='build' \
    -C "$(dirname "$PROJECT_DIR")" \
    "$(basename "$PROJECT_DIR")"

if [ $? -eq 0 ]; then
    echo "Backup created successfully: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
    echo "Backup size: $(du -h "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" | cut -f1)"
else
    echo "Backup failed!"
    exit 1
fi