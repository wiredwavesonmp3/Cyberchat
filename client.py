import socket
import threading

C = {
    "p": "\033[95m",
    "c": "\033[96m",
    "g": "\033[92m",
    "r": "\033[91m",
    "w": "\033[0m"
}

nickname = input(f"{C['p']}NEURAL ID: {C['w']}")

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

SERVER_IP = "203.192.225.192"
SERVER_PORT = 10000

client.connect((SERVER_IP, SERVER_PORT))

def receive():
    while True:
        try:
            msg = client.recv(1024).decode()
            print(f"\n{C['c']}[NET] {msg}{C['w']}")
        except:
            print(f"{C['r']}CONNECTION LOST{C['w']}")
            break

def write():
    while True:
        msg = input()
        full = f"{C['p']}{nickname}{C['w']}: {C['g']}{msg}{C['w']}"
        client.send(full.encode())

print(f"{C['p']}=== CYBERNET LINK ONLINE ==={C['w']}")

threading.Thread(target=receive).start()
write()
