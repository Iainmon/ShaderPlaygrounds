
rgbs = gets.to_s.split(' ').map do |eight_bit_color_value|
    c = eight_bit_color_value.to_i.to_f / 255_f32
    c.round 4
end

puts ""
puts "vec3( #{rgbs[0]}, #{rgbs[1]}, #{rgbs[2]} )"
puts ""