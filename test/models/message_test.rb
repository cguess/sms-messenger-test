require "test_helper"

class MessageTest < ActiveSupport::TestCase
  setup do
  end

  test "should not save message without text" do
    message = Message.new(session_id: "1", sender: "1", receiver: "2", date: DateTime.now)
    assert_not message.save, "Saved the message without text"
  end

  test "should not save message without conversation_id" do
    message = Message.new(text: "Hello, world!")
    assert_not message.save, "Saved the message without conversation_id"
  end

  test "after saving, should send a message to the conversation" do
    message = Message.new(text: "Hello, world!", session_id: "1", sender: "1", receiver: "2", date: DateTime.now)
    assert message.save
  end

  test "should send message to Twilio" do
    assert_difference 'Message.count' do
      message = Message.new(text: "Hello, world!", session_id: "1", sender: "1", receiver: "2", date: DateTime.now)
      assert message.save
    end
    assert message.twilio_sid.present?
    assert_equal "queued", message.twilio_status
    assert message.twilio_error_code.nil?
    assert message.twilio_error_message.nil?
  end

  test "should handle Twilio errors" do
    assert_difference 'Message.count' do
      message = Message.new(text: "Hello, world!", session_id: "1", sender: "1", receiver: "2", date: DateTime.now)
      assert message.save
    end
    assert message.twilio_sid.nil?
    assert_equal "failed", message.status
    assert message.twilio_status.nil?
    assert message.twilio_error_code.present?
    assert message.twilio_error_message.present?
  end
end
