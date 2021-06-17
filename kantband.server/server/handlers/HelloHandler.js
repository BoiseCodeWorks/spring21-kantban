import { SocketHandler } from '../utils/SocketHandler'

export class HelloHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
  constructor(io, socket) {
    super(io, socket, true)
    this
      .on('hello', this.helloEvent)
      .on('join:room', this.joinRoom)
  }

  async helloEvent(payload) {
    payload.server = true
    this.socket.emit('hi', payload)
    // this.io.emit('broadcast')
  }

  async joinRoom() {
    this.socket.join('banana')
    this.io.to('banana').emit('newUserJoinedROOM')
  }
}
