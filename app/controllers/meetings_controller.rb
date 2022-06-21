class MeetingsController < ApplicationController
  def new
    @meeting = Meeting.new
  end

  def create
    @meeting = Meeting.new(meeting_params)
    @meeting.user = current_user
    if @meeting.save
      @chatroom = Chatroom.create(name: @meeting.name)
      @chatroom.meeting = @meeting
      @meeting.save
      redirect_to user_path(current_user)
    else
      render :new
    end
  end

  def edit
    @meeting = Meeting.find(params[:id])
  end

  def update
    @meeting = Meeting.find(params[:id])
    @meeting.update(meeting_params)
    redirect_to user_path(current_user)
  end

  def show
    @meeting = Meeting.find(params[:id])
    start_date = params.fetch(:start_date, Date.today).to_date
    @meetings = Meeting.where(start_time: start_date.beginning_of_month.beginning_of_week..start_date.end_of_month.end_of_week)
    @chatroom = Chatroom.find(@meeting.chatroom_id)
    @message = Message.new
  end

  def meeting_params
    params.require(:meeting).permit(
      :start_time,
      :end_time,
      :name
    )
  end
end
