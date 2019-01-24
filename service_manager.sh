#!/bin/bash

if [ "$1" = "install" ]
then
    echo "Adding h264server service to systemctl..."
    sudo cp h264server.service /etc/systemd/system/h264server.service
    sudo systemctl enable h264server.service
    echo "Done."
elif [ "$1" = "start" ]
then
    echo "Starting h264server service..."
    sudo systemctl start h264server.service
elif [ "$1" = "stop" ]
then
    echo "Stopping h264server service..."
    sudo systemctl stop h264server.service
elif [ "$1" = "enable" ]
then
    echo "Enabling h264server service to start on boot..."
    sudo systemctl enable h264server.service
elif [ "$1" = "disable" ]
then
    echo "Disabling h264server service from starting on boot..."
    sudo systemctl disable h264server.service
elif [ "$1" = "uninstall" ]
then
    echo "Removing h264server service from systemctl..."
    sudo systemctl stop h264server.service
    sudo systemctl disable h264server.service
    sudo rm -f /etc/systemd/system/h264server.service
    sudo systemctl daemon-reload
elif [ "$1" = "help" ]
then
    echo ""
    echo "./service_manager.sh argument"
    echo ""
    echo "install - installs h264server service and enables start on boot"
    echo "start - starts h264server via systemctl (service must be installed)"
    echo "stop - stops h264server via systemctl (service must be installed)"
    echo "enable - enables h264server to start on boot (service must be installed)"
    echo "disable - disables h264server from starting on boot (service must be installed)"
    echo "uninstall - completely removes h264server service from systemctl"
    echo ""
else
    echo "Invalid option. Options are help, install, uninstall, enable, disable, start, stop."
fi