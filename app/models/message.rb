# A message is a message that has been sent to a user
# Currently the session_id is randomly generated and stored in the local storage of the browser
# This is not the correct way to do this, but it is a quick and easy solution until we have a proper authentication system
class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  field :session_id, type: String
  field :text, type: String  
  field :sender, type: String
  field :receiver, type: String
  field :date, type: DateTime
  field :status, type: String, default: "queued"
  field :twilio_sid, type: String
  field :twilio_status, type: String
  field :twilio_error_code, type: String
  field :twilio_error_message, type: String
  
  # Validations
  validates_presence_of :text, :session_id, :sender, :receiver, :date
  validates_length_of :text, maximum: 250

  # After the message is created, send it to Twilio
  after_create :send_sms

  private

  # Sends a message to Twilio
  # If the message is not sent, sets the status to "failed" and saves the error code and message
  # If the message is sent, sets the status to "sent" and saves the Twilio SID and status
  def send_sms
    client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
    
    begin
      message = client.messages.create(
        from: ENV['TWILIO_PHONE_NUMBER'],
        to: receiver,
        body: text
      )
    rescue Twilio::REST::TwilioError => e
      self.twilio_error_code = e.code
      self.twilio_error_message = e.message
      self.status = "failed"
      save!
      logger.error "Message failed to send to #{receiver} with body #{text}: #{e.message}"
      return
    end

    self.status = "sent"
    self.twilio_sid = message.sid
    self.twilio_status = message.status
    
    save!
    logger.info "Message sent to #{receiver} with body #{text}"
  end
end
