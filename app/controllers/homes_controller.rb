class HomesController < ApplicationController
  def index
    @iocs = ["email", "domain", "url", "ip", "md5", "sha256"]

    @Submit = Submit.new
  end
end
