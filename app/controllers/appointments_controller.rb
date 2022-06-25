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
    time_slot = @appointment.start_time
    @coach_pic = @appointment.coach.user.photo.key

    image_url = Cloudinary::Utils.cloudinary_url(@coach_pic, {gravity: :face, height: 300, width: 300, radius: :max, crop: :fill, :border=>"5px_solid_rgb:ffef64", :background=>"rgb:ffc65a"})
    pattern = %r{res.cloudinary.com/[a-zA-z]+/image/upload/[\w,:]+}
    if Rails.env.development?
      text_to_add = '/v1/development'
      @image_url = image_url.gsub(pattern, "#{pattern.match(image_url)}#{text_to_add}")
    elsif Rails.env.production?
      text_to_add = '/v1/production'
    end
    @image_url = image_url.gsub(pattern, "#{pattern.match(image_url)}#{text_to_add}")

    if @appointment.save!

      session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        line_items: [{
          name: "You are booking a lesson with #{@coach.user.first_name}",
          description: "#{time_slot.strftime("%I:%M%p - ")}#{(time_slot + 3600).strftime("%I:%M%p")} on #{time_slot.strftime("%A %d %B %Y")}",
          images: [@image_url],
          amount: @appointment.amount_cents,
          currency: 'gbp',
          quantity: 1
        }],
        success_url: appointment_url(@appointment),
        cancel_url: appointment_url(@appointment)
      )

      @appointment.update(checkout_session_id: session.id)
      redirect_to new_appointment_payment_path(@appointment)
      # flash[:notice] = "Appointment requested"

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
# options = {width: 50, height: 50, crop: :fill}
# Cloudinary::Utils.cloudinary_url(@coach.user.photo.key, {width: 50, height: 50, crop: :fill})
