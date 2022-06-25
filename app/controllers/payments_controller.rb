class PaymentsController < ApplicationController
  def new
    @appointment = current_user.appointments.where(state: 'pending').find(params[:appointment_id])
    @time_slot = @appointment.start_time
    @coach_pic = @appointment.coach.user.photo.key
  end
end
