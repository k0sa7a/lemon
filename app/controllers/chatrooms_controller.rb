class ChatroomsController < ApplicationController
  def show
    @chatroom = Chatroom.find(params[:id])
    @message = Message.new
    # @meeting = Meeting.find(params[:meeting_id])
  end

  def index
    @chatrooms = current_user.chat_rooms
  end

  def create
    if params[:chatroom][:private]
      privatechat = Privatechat.new(coach_id: params[:chatroom][:coach_id], user_id: current_user.id)
      @chatroom = Chatroom.create!(chatroom_params)
      privatechat.chatroom = @chatroom
      privatechat.save!
    else
      @chatroom = Chatroom.create!(chatroom_params)
    end
    redirect_to chatroom_path(@chatroom)
  end

  def chatroom_params
    params.require(:chatroom).permit(
      :name,
      :private
    )
  end
end
