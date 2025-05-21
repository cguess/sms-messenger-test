class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Skip CSRF protection for API requests which are not handled by Angular
  skip_before_action :verify_authenticity_token
end
