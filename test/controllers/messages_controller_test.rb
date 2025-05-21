require "test_helper"

class MessagesControllerTest < ActionDispatch::IntegrationTest

  test "should get index" do
    get messages_url
    assert_response :success
  end

  test "should create message" do
    assert_difference 'Message.count' do
      post messages_url, params: { message: { session_id: '1', sender: '1', receiver: '2', text: 'Hello, world!', date: DateTime.now } }
    end
    assert_response :success
  end

  test "should return error if message is not valid" do
    post messages_url, params: { message: { session_id: '1', sender: '1', receiver: '2', text: 'Hello, world!', date: DateTime.now } }
    assert_response :unprocessable_entity
  end
end
