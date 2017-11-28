class SLList(object):
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0

    def addBack(self, val):
        if not self.head:
            self.head = SLNode(val)
            self.tail = self.head
            return self
        run = self.head
        while run.next != None:
            run = run.next
        run.next = SLNode(val)
        self.tail = run.next
        self.length += 1
        return self

    def addFront(self, val):
        if not self.tail:
            self.head = SLNode(val)
            self.tail = self.head
            return self
        temp = self.head
        self.head = SLNode(val)
        self.head.next = temp
        self.length += 1
        return self

    def pushListToBack(self, arr):
        idx = 0
        limit = len(arr)
        if not self.head:
            self.head = SLNode(arr[idx])
            idx += 1
        run = self.head
        while run.next != None:
            run = run.next
        while idx != limit:
            run.next = SLNode(arr[idx])
            idx += 1
            run = run.next
        self.length += limit
        self.tail = run
        return self

    def returnAsList(self):
        ret = []
        run = self.head
        while run != None:
            ret.append(run.val)
            run = run.next
        return ret

    def insertBefore(self, targetVal, newVal, goAnyway=False):
        # put True as last argument to insert at end if targetVal not found
        if not self.head:
            if not goAnyway:
                print "Cannot insert before target, as SLL is empty."
                return self
            else:
                self.head = SLNode(newVal)
                self.tail = self.head
                self.length += 1
                return self
        run = self.head
        while run.next != None and run.next.val != targetVal:
            run = run.next
        if run.next != None or goAnyway:
            temp = run.next
            run.next = SLNode(newVal)
            run.next.next = temp
            self.length += 1
            if temp == None:
                self.tail = run.next
        else:
            print "Cannot insert before target, as it was not found in SLL."
        return self

    def insertAfter(self, targetVal, newVal, goAnyway=False):
        # put True as last argument to insert at end if targetVal not found
        if not self.head:
            if not goAnyway:
                print "Cannot insert after target, as SLL is empty."
                return self
            else:
                self.head = SLNode(newVal)
                self.tail = self.head
                self.length += 1
                return self
        run = self.head
        while run.next != None and run.val != targetVal:
            run = run.next
        if run.val == targetVal or goAnyway:
            temp = run.next
            run.next = SLNode(newVal)
            run.next.next = temp
            self.length += 1
            if temp == None:
                self.tail = run.next
        else:
            print "Cannot insert after target, as it was not found in SLL."
        return self

    def removeOneNode(self, targetVal):
        if not self.head:
            print "SLL is empty."
            return self
        run = self.head
        while run.next != None:
            if run.next.val == targetVal:
                if run.next.next == None:
                    self.tail = run
                run.next = run.next.next
                self.length -= 1
                return self
            run = run.next
        print "Target value not found."
        return self

    def removeAllNodes(self, targetVal):
        if not self.head:
            print "SLL is empty."
            return self
        run = self.head
        while run != None and run.next != None:
            if run.next.val == targetVal:
                if run.next.next == None:
                    self.tail = run
                run.next = run.next.next
                self.length -= 1
            run = run.next
        return self

    def returnInReverse(self):
        transformed = self.returnAsList()
        ret = []
        for idx in range(self.length-1, -1, -1):
            ret.append(transformed[idx])
        return ret

    def reverse(self):
        transformed = self.returnAsList()
        run = self.head
        while run !== None:
            run.val = transformed.pop()
            run = run.next
        return self

class SLNode(object):
    def __init__(self, val):
        self.val = val
        self.next = None

test = SLList()
test.pushListToBack([1,2,4,5])
print test.returnAsList()
test.pushListToBack([6,7,8])
print test.returnAsList()
test.addFront(12)
test.addBack(3)
print test.returnAsList()
test.removeOneNode(3)
print test.returnAsList()
print test.returnInReverse()
print test.head.val
print test.tail.val
print test.length