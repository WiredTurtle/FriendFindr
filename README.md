# FriendFindr
A system to passively track the location of individual users by collecting mac-address probe requests.
## Goal
Passively track people with publicly accessible data.

## Dependencies

### Ubuntu Server (14.04)
* MySQL-Server

* NodeJS (Node_Modules: express, fs, mysql)

### Raspberry Pi Node
* python 2.7

* python-scapy

# Getting Started Quickly

Execute:

`chmod 755 setup.sh`

Then add the following line below as a cronjob. This will execute the script at boot.

`@reboot /'filepath of setup.sh'`

The idea for this project was inspired by the hak5 Wifi Pineapple birdhouse. Vivek from securitytube.net had a great youtube tutorial on how to capture wifi packets with scapy. Some of the code in the main python file is from Vivek's tutorial.

## More updates to the documentation coming soon.
