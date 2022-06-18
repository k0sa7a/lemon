class NotificationsController < ApplicationController
  def create
  end

  private

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
