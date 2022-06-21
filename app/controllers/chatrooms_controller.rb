class ChatroomsController < ApplicationController
  def show
    @chatroom = Chatroom.find(params[:id])
    @message = Message.new
    @meeting = Meeting.find(params[:meeting_id])
  end
end
