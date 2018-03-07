
#!/usr/bin/env python

import asyncio
import websockets

async def hello():
    async with websockets.connect('ws://192.168.31.48:9999') as websocket:


        greeting = await websocket.recv()
        print("< {}".format(greeting))

asyncio.get_event_loop().run_until_complete(hello())
