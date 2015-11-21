import React, {
	Component,
	View,
	ListView,
	TextInput,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	ActivityIndicatorIOS,
	StyleSheet,
} from 'react-native';

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	todoRow: {
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: fullWidth,
		height: 40,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1,
	},
	todoText: {
		fontSize: 16,
		color: '#666666',
	},
	todoTextDone: {
		fontSize: 16,
		color: '999999',
		textDecorationColor: '#999999',
		textDecorationLine: 'line-through', 
		textDecorationStyle: 'solid'
	},
	success: {
		color: 'green',
	},
	pendding: {
		color: 'blue',
	},
	inputText: {
		height: 40,
		width: (fullWidth-20)*0.8,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: (fullWidth - 20)*0.2,
		backgroundColor: '#EEEEEE',
		padding: 10,
	}
});

export default class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: null,
			placeholder: '写下你将来要做的事情'
		}
	}

	componentDidMount() {
		const { loadTodos } = this.props.actions;
		loadTodos();
	}

	appendTodoList() {
		const text = this.state.text;
		const { appendTodo } = this.props.actions;
		appendTodo(text);
		this.setState({ text: null });
	}

	renderHeader() {
		return (
			<View style={styles.todoRow}>
				<TextInput
					value={this.state.text}
					placeholder={this.state.placeholder}
					onChangeText={(text) => this.setState({ text })}
					style={styles.inputText} />

				<TouchableOpacity onPress={this.appendTodoList.bind(this)} style={styles.button}>
					<Text style={styles.buttonText}>添加</Text>
				</TouchableOpacity>

			</View>
		);
	}

	renderRow(dataRow) {
		const { selectTodo } = this.props.actions;
		return (
		
			<View style={styles.todoRow}>
				<Text style={ dataRow.selected ? styles.todoTextDone : styles.todoText}>{dataRow.text}</Text>
				<TouchableOpacity onPress={() => selectTodo(dataRow)}>
					{ dataRow.selected ? <Text style={styles.success}>完成</Text> : <Text style={styles.pendding}>待办</Text> }
				</TouchableOpacity>

			</View>
		
		)
	} 

	renderList() {
		const { todo } = this.props.state;
		return (
			<ListView 
				style={styles.container}
				dataSource={todo.dataSource}
				renderHeader={this.renderHeader.bind(this)}
				renderRow={this.renderRow.bind(this)} />
		);
	}

	renderIndicator() {
		return (
			<ActivityIndicatorIOS animating={true} color={'#808080'} size={'small'} />
		);
	}

	render() {
		const { todo } = this.props.state;
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{ todo.type != 'INITIAL_TODOS' ? this.renderList() : this.renderIndicator() } 
			</View>
		);
	}
}