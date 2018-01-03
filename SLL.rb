class SLL
  attr_accessor :head
    def initialize
      @head = nil
    end
    
    def add_front(val)
      self.head = SLNode.new(val, self.head)
      return self
    end

    def add_back(val)
      run = self.head
      return self.head = SLNode.new(val) if run == nil
      run = run.next while run.next != nil
        run.next = SLNode.new(val)
        return self
    end

    def push_array(arr)
        self.head = SLNode.new(arr.slice!(0)) if self.head == nil
        run = self.head
        run = run.next while run.next != nil
        arr.each { |val| run.next = SLNode.new(val); run = run.next }
        return self
    end

    def insert_before(val, target)
        # return false if target not found
        run = self.head
        run = run.next while run.next != nil and run.next.val != target
        return false if run.next == nil
        run.next = SLNode.new(val, run.next)
        return true
    end

    def remove(val)
        return false if self.head == nil
        if self.head.val == val
            self.head = self.head.next
            return true
        end
        run = self.head
        run = run.next while run.next != nil and run.next.val != val
        return false if run.next == nil
        run.next = run.next.next
        return true
    end

    def display
        run = self.head
        while run != nil do
            print run.val.to_s
            pval = run.next != nil ? ' -> ' : "\n"
            print pval
            run = run.next
        end
        return self
    end
end

class SLNode
    attr_accessor :val, :next
    def initialize(val, node=nil)
        @val = val
        @next = node
    end
end

testing = SLL.new
t0 = Time.now
testing.push_array([1,2,3]).remove(3)
t1 = Time.now
testing.display
p t1-t0