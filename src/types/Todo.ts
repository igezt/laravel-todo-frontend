export default interface Todo {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number;

  // At first I wanted to put them as Date objects, but seeing as how the app doesnt do anything to operate on dates,
  // I am leaving them as strings to make it easier to pass data around.
  created_at: string;
  updated_at: string;
}
