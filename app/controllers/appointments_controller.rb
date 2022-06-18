class AppointmentsController < ApplicationController
  def new
    @appointment = Appointment.new
    @coach = Coach.find(params[:coach_id])
  end

  def create
    @coach = Coach.find(params[:coach_id])
    @appointment = Appointment.new(appointment_params)
    @appointment.coach = @coach
    @appointment.user = current_user
    if @appointment.save!
      flash[:notice] = "Appointment requested"
      # redirect_to appointment_path(@appointment)
      create_notification(@appointment)
    else
      flash.now[:alert] = "Sorry there was an issue"
      render :new
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(
      :start_time,
      :end_time,
      :coach_id
    )
  end

  def create_notification(appointment)
    @notification = Notification.new
    @notification.appointment = appointment
    @notification.user = appointment.coach.user
    @notification.save!
  end

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end
end
