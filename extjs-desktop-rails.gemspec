# -*- encoding: utf-8 -*-
require File.expand_path('../lib/extjs-desktop-rails/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["rubyonme"]
  gem.email         = [""]
  gem.description   = %q{extjs-desktop-railsp}
  gem.summary       = %q{extjs-desktop-rails}
  gem.homepage      = ""

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "extjs-desktop-rails"
  gem.require_paths = ["lib"]
  gem.version       = Extjs::Desktop::Rails::VERSION
end
