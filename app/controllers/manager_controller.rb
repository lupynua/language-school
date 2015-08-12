class ManagerController < ApplicationController
  layout 'manager'

  before_action :authenticate_user!
  before_action :require_admin
end
