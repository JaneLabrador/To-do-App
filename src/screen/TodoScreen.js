import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { UUID } from "react-native-uuid";
import Fallback from "../compotents/Fallback";


console.log(Date.now().toString());

const TodoScreen = () => {
	// Init local states
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [editedTodo, setEditedTodo] = useState(null);

	

	// Handle Add Todo
	const handleAddTodo = () => {
		// sturtcure of a single todo item
		// {
		// 	id:
		// 	title:
		// }

		if (todo === "") {
			return; // early return
		}

		setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
		setTodo("");
	};

	// Handle Delete
	const handleDeleteTodo = (id) => {
		const updatedTodoList = todoList.filter((todo) => todo.id !== id);

		setTodoList(updatedTodoList);
	};

	// Handle Edit todo

	const handleEditTodo = (todo) => {
		setEditedTodo(todo);
		setTodo(todo.title);
	};

    const toggleComplete = (id) => {
		const updatedTodoList = todoList.map((item) => {
			if (item.id === id) {
				return { ...item, done: !item.done };
			}
			return item;
		});
		setTodoList(updatedTodoList);
	};

	// Handle Update

	const handleUpdateTodo = () => {
		const updatedTodos = todoList.map((item) => {
			if (item.id === editedTodo.id) {
				return { ...item, title: todo };
			}

			return item;
		});
		setTodoList(updatedTodos);
		setEditedTodo(null);
		setTodo("");
	};

	// Render todo
	const renderTodos = ({ item, index }) => {
		return (
			<View
				style={{
					backgroundColor: "#AFAFAF",
					borderRadius: 16,
					paddingHorizontal: 6,
					paddingVertical: 8,
					marginBottom: 16,
					flexDirection: "row",
					alignItems: "center",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.6,
					shadowRadius: 2,
					// elevation: for android
				}}
			>
                <TouchableOpacity onPress={() => toggleComplete(item.id)}>
					<View
						style={{
							height: 24,
							width: 24,
							borderWidth: 2,
							borderColor: item.done ? "gray" : "gray",
							borderRadius: 18,
							marginRight: 12,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{item.done && (
							<View
								style={{
									height: 12,
									width: 12,
									backgroundColor: "black",
									borderRadius: 16,
								}}
							/>
						)}
					</View>
				</TouchableOpacity>
				<Text
					style={{ color: "black", fontSize: 19, fontWeight: "800", flex: 1 }}
				>
					{item.title}
				</Text>

				<IconButton
					icon="pencil"
					iconColor="black"
					onPress={() => handleEditTodo(item)}
				/>
				<IconButton
					icon="trash-can"
					iconColor="black"
					onPress={() => handleDeleteTodo(item.id)}
				/>

                
			</View>
		);
	};

	return (
        
        
		<View style={{ marginHorizontal: 18, marginTop: 40 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold'}}>Today's Task </Text>
			<Text style={{ fontSize: 16, marginTop: 2}}> Routine and somehow a daily reminder.</Text>
			<TextInput
				style={{
					borderWidth: 2,
					borderColor: "#000000",
					borderRadius: 6,
					paddingVertical: 8,
					paddingHorizontal: 16,
                    marginTop: 26,
                    
				}}
				placeholder="Add a task"
				value={todo}
				onChangeText={(userText) => setTodo(userText)}
			/>

			{editedTodo ? (
				<TouchableOpacity
					style={{
						backgroundColor: "#000",
						borderRadius: 6,
						paddingVertical: 12,
						marginVertical: 34,
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.8,
						shadowRadius: 3,
					}}
					onPress={() => handleUpdateTodo()}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
						Save
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={{
						backgroundColor: "#000",
						borderRadius: 6,
						paddingVertical: 12,
						marginVertical: 34,
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.8,
						shadowRadius: 3,
					}}
					onPress={() => handleAddTodo()}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
						Add
					</Text>
				</TouchableOpacity>
			)}

			{/* Render todo list */}

			<FlatList data={todoList} renderItem={renderTodos} />

			{todoList.length <= 0 && <Fallback />}
		</View>
	);
};		


export default TodoScreen;


const styles = StyleSheet.create({});