class NotificationsController < ApplicationController
  before_action :set_notification, only: [:show]

  def create
    @notification = Notification.new(notification_params)
    if current_user == @notification.appointment.user
      @notification.user = @notification.appointment.coach.user
    else
      @notification.user = @notification.appointment.user
    end
    @notification.save!
  end

  def index
    @notifications = Notification.where(user: current_user).includes(:appointment)
  end

  def show
    if appointment?(@notification)
      @event_type = "appointment"
      @appointment = @notification.appointment
      if coach?(@notification)
        @sent_from = @appointment.user
        @user_type = 'coach'
      else
        @sent_from = @appointment.coach.user
        @user_type = 'student'
      end
    else
      @event_type = "event"
    end
    @notification.viewed = true
    @notification.save
    @response = Notification.new
  end

  private

  def appointment?(notification)
    notification.appointment.present?
  end

  def coach?(notification)
    current_user == notification.appointment.coach.user
  end

  def notification_params
    params.require(:notification).permit(
      :content,
      :appointment_id,
      :user_id
    )
  end

  def set_notification
    @notification = Notification.find(params[:id])
  end
end
