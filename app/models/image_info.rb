class ImageInfo < ActiveRecord::Base

  has_attached_file :file,
    :path => ":rails_root/public/images/:id/:filename",
    :url  => "/images/:id/:filename"


  #do_not_validate_attachment_file_type :image

	validates_attachment :file,
  :content_type => {:content_type => ['image/jpeg', 'image/pjpeg', 'image/jpg','image/png', 'image/tif', 'image/gif'],
										:message => "has to be in a proper format"}, 
										:size => { :in => 0..2.megabytes }
end
