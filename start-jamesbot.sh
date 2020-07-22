#!/bin/bash

# Make a folder ./logs/ if it doesn't exist yet
mkdir -p logs

# Start the bot, and redirect stdout and stderr to a log file in the folder ./logs/
node jamesbot.js > logs/jamesbot_$(date +%y%m%d)_$(date +%H%M%S).log 2>&1 &
