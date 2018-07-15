# Get BlueZ for RPi

There is a tutorial on adafruit.

https://learn.adafruit.com/install-bluez-on-the-raspberry-pi/installation

# Check if bluetooth is active in the RPi
$ systemctl status bluetooth

# Start bluetooth if not running
$ sudo systemctl start bluetooth

# ACTUALLY Start bluetooth (stuff above is obsolete, since the migration to bleno js)

$ sudo hciconfig hci0 up
