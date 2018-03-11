#!/usr/bin/env python

import asyncio
import sys
import websockets

async def hello(websocket, path):
    try:
        while True:
            name = await websocket.recv()
            print (name)
        # await consumer(name)
    except websockets.exceptions.ConnectionClosed:
        print ("Toot gaya")
    finally:
        sys.exit(0)
start_server = websockets.serve(hello, '192.168.31.8', 8761 )

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
