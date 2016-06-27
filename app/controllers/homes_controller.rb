class HomesController < ApplicationController
  def index
    @iocs = ["ip", "email", "domain", "url", "file name", "md5", "sha256"]

    @Submit = Submit.new
  end
end
