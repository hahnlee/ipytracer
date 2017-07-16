from unittest import TestCase

from ipytracer import Tracer


class TracerTest(TestCase):
    def test_list_method(self):
        test_list = [1, 2, 3, 4, 5, 6]
        test_tracer = Tracer([1, 2, 3, 4, 5, 6])
        
        # Test Equal
        self.assertEqual(test_list, test_tracer.tolist())
        for i in range(len(test_tracer)):
            self.assertEqual(test_list[i], test_tracer[i])

        # Test Append
        test_append = [7, 8]
        self.assertEqual(test_list.append(test_append),
                test_tracer.append(test_list))

        # Test __len__
        self.assertEqual(len(test_list), len(test_tracer))

        # Test Print
        self.assertEqual(print(test_list), print(test_tracer))

    def test_slice(self):
        test_list = [1, 2, 3, 4, 5, 6]
        test_tracer = Tracer([1, 2, 3, 4, 5, 6])
        self.assertEqual(test_list[:], test_tracer[:])
        self.assertEqual(test_list[:3], test_tracer[:3])
