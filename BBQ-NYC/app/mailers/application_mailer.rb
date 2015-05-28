class UserNotifier < ActionMailer::Base
  default :from => "iheartBBQ@BBQ.com"
  layout 'mailer'

  def send_rsvp_email(user, event, location)
    @user = user
    @event = event
    @location = location
    mail( :to => @user.email,
    :subject => 'Come grill at ' + @location.name + ' with all of your friends!'
  end
end

