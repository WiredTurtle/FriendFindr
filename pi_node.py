from scapy.all import *
import time
import hashlib
import urllib2

location = '1'
#Blacklisted access points to diminish database bloat.
blacklist = ['64:d8:14','64:d9:89','64:ae:0c','10:bd:18','58:94:6b','00:00:00','00:c0:ca','b8:27:eb','00:0d:67','a0:cf:5b','cc:fb:65','b8:ae:6e','7c:bb:8a','80:19:34','ba:ae:6e','14:dd:a9','92:c7:92']


try:
        def PacketHandler(packet):
                if packet.haslayer(Dot11):
                        dot11_layer = packet.getlayer(Dot11)
                        mac = dot11_layer.addr2
                        if mac[:8] not in blacklist:
                                m = hashlib.md5()
                                m.update(mac[9:])
                                hashed = m.hexdigest()
                                mac = mac[:8] + ':' + hashed[:8]
                                urllib2.urlopen('url goes here /api/upload/' + mac + '/' + location)
                                print mac

except Exception:
       pass

while True:

        try:
		sniff(iface = 'mon0',prn = PacketHandler)

	except:
		pass
