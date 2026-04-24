import socket
import threading

clients = []

def broadcast(msg, sender):
    for c in clients:
        if c != sender:
            try:
                c.send(msg)
            except:
                clients.remove(c)

def handle(client):
    while True:
        try:
            msg = client.recv(1024)
            broadcast(msg, client)
        except:
            clients.remove(client)
            client.close()
            break

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("0.0.0.0", 10000))
server.listen()

print("[ CYBERNET ONLINE ] Port 10000 active")

while True:
    client, addr = server.accept()
    print("[ CONNECT ]", addr)
    clients.append(client)
    threading.Thread(target=handle, args=(client,)).start()
