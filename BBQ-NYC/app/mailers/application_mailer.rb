class UserNotifier < ActionMailer::Base
  default :from => "iheartBBQ@BBQ.com"
  layout 'mailer'

  def send_rsvp_email(user, event)
    @user = user
    @event = event
    mail( :to => @user.email,
    :subject => 'Come grill at ' + @event.name + ' with all of your friends!'
  end
end

