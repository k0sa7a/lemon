class AppointmentsController < ApplicationController
  def show
    @appointment = current_user.appointments.find(params[:id])
  end

  def create
    @appointment = Appointment.new(appointment_params)
    @coach = @appointment.coach
    @appointment.amount = @coach.price
    @appointment.user = current_user
    @appointment.state = 'pending'

    if @appointment.save!
      # redirect_to appointment_path(@appointment)
      # create_notification(@appointment)
      # redirect_to coach_path(@coach)
      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: [{
          name: @coach.user.first_name,
          images: [@coach.user.photo.key],
          amount: @appointment.amount_cents,
          currency: 'gbp',
          quantity: 1
        }],
        success_url: appointment_url(@appointment),
        cancel_url: appointment_url(@appointment)
      )

      @appointment.update(checkout_session_id: session.id)
      redirect_to new_appointment_payment_path(@appointment)
      flash[:notice] = "Appointment requested"
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
