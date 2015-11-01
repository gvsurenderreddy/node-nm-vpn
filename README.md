# node-nm-vpn
Control VPN connections from node using NetworkManager's cli.

I use this to switch VPNs on my Raspberry Pi - what will you use it for? Probably not a production app; this is very thrown-together stuff...

That said, here are a few things you'll need to bear in mind:

## VPN passwords
Each VPN connection has its own configuration file (on Ubuntu, these live in `/etc/NetworkManager/system-connections/`). To enable automated activation of connections, NetworkManager grabs the password either from the users keyring or the configuration file. I couldn't figure out how to get the keyring method working; to set the password in the configuration file, you need something like:

/etc/NetworkManager/system-connections/My_VPN:

```
[vpn]
# [...] username, etc properties
password-flags=0 # Tells NetworkManager to read password from [vpn-secrets] below

[vpn-secrets]
password=my_vpn_password
```

## Network control authorisation
If your app uses this module and is started via SSH then you may receive this error when trying to activate a connection:

`Connection activation failed: Not authorized to control networking.`

I believe this occurs because while desktop users get granted the CAP_NET_ADMIN capability, remote (i.e. SSH) users do not, and are therefore unable to bring connections up or down. You can get around this by having your app run as root, but I that's not recommended for obvious reasons. I've tried using `setcap` to add the capability manually but that results in timeout errors when (de)activating connections, so your best bet right now is to start the app as a desktop user. For me that means plugging in a keyboard and screen to my Pi and starting the app locally. If anyone knows a workaround, please feel free to submit a pull request or raise an issue. I may post on AskUbuntu when I get a sec.

