require 'benchmark'

def merge(left, right)
  l = 0
  r = 0
  result = []

  while l != left.size || r != right.size
    if go_left(left, right, l, r)
      result << left[l]
      l += 1
    else
      result << right[r]
      r += 1
    end
  end

  result
end

def merge_sort(array)
  return array if array.size <= 1
  mid = (array.size / 2).floor
  left = merge_sort(array[0...mid])
  right = merge_sort(array[mid..-1])
  merge(left, right)
end

def go_left(left, right, l, r)
  r == right.size || (l != left.size && left[l] < right[r])
end

test = []
1000.times { test << Random.rand(1000) }
puts Benchmark.measure { merge_sort(test) }

def bubble_sort(array)
  (array.size - 1).downto(1) do |i|
    no_swaps = true
    0.upto(i - 1) do |j|
      if array[j] > array[j + 1]
        array[j], array[j + 1] = array[j + 1], array[j]
        no_swaps = false
      end
    end
    break if no_swaps
  end
  array
end

puts Benchmark.measure { bubble_sort(test) }

test2 = []
1.upto(1000) { |i| test2 << i }

puts Benchmark.measure { bubble_sort(test2) }