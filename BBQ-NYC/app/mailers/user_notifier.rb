class UserNotifier < ApplicationMailer
  # default :from => "iheartBBQ@BBQ.com"
  # layout 'mailer'

  def send_rsvp_email(user, event, link)
    @user = user
    @event = event
    @link = link
    mail( :to => @user.email,
    :subject => 'Come grill at ' + @event.name + ' with all of your friends!')
  end
end
