class MessagesController < ApplicationController
  # GET /messages
  # Returns a JSON response with the messages that have not failed to send
  def index
    @messages = Message.where(session_id: params[:session_id], twilio_error_code: nil, twilio_error_message: nil).order(created_at: :desc)

    render json: @messages
  end

  # POST /messages
  # Creates a new message and sends it to Twilio
  # Returns a JSON response with the message and the status of the message
  # If the message is not valid, returns a JSON response with the error
  def create
    puts "Creating message"
    @message = Message.create(message_params)

    if @message.twilio_error_code.present? || @message.twilio_error_message.present?
      render json: { success: false, error: @message.twilio_error_message }, status: :unprocessable_entity
    else
      render json: @message
    end
  end

  private

  def message_params
    params.require(:message).permit(:session_id, :sender, :receiver, :text, :date)
  end
end
