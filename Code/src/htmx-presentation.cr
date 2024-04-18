require "kemal"

# TODO: Write documentation for `Htmx::Presentation`
module Htmx::Presentation
  VERSION = "0.1.0"

  post "/api/age-calc" do |env|
    age = env.params.json["age"].as(Int64)
    react_user = env.params.json["react_user"]
    
    human_age =  (16 * Math.log(age) + 31).round
    if react_user
      human_age += 10
    end

    response = { dev_age: age, human_age: human_age }.to_json
    env.response.content_type = "application/json"
    response
  end

  post "/api/age-calc-htmx" do |env|
    age = env.params.body["age"].to_i
    react_user = env.params.body.fetch("react_user", false)
    
    human_age =  (16 * Math.log(age) + 31).round
    
    if react_user
      human_age += 10
    end
    age_with_htmx = human_age - 20

    render "src/views/age.ecr"
  end

  Kemal.run
end
