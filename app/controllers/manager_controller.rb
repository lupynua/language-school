class ManagerController < ApplicationController
  layout 'manager'

  before_action :authenticate_user!
  before_filter :require_admin
end
