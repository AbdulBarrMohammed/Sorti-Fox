
class ListNode():
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head, n):
    pass



def create_linked_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    current = head
    for val in values[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

# Utility function to print a linked list
def print_linked_list(head):
    current = head
    while current:
        print(current.val, end=" -> ")
        current = current.next
    print("None")


values = [1]
head = create_linked_list(values)
print("Original list:")
print_linked_list(head)

n = 1
head = removeNthFromEnd(head, n)
print_linked_list(head)


values = [1]
head = create_linked_list(values)

head = deleteDuplicates(head)
print_linked_list(head)
