import React, {
	ListView
} from 'react-native';

const defaultTodos = [
					{text: '写代码'},
					{text: '哄妹纸'},
					{text: '做饭洗碗家务事'},
					{text: '等等...'}
				];

module.exports = function(state, action) {
	state = state || {
		type: 'INITIAL_TODOS',
		todos: []
	}

	switch(action.type) {
		
		case 'LOAD_TODOS': {
			var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
			dataSource = dataSource.cloneWithRows(defaultTodos);

			return {
				...state,
				...action,
				todos: defaultTodos,
				dataSource,
			}
		}

		case 'APPEND_TODO': {
			var todos = [ ...state.todos ];
			todos.unshift(action.todo);
			dataSource = state.dataSource.cloneWithRows(todos);
			return {
				...state,
				...action,
				todos,
				dataSource
			}
		}

		case 'SELECT_TODO': {
			var selected = action.selected;
			var todos = [ ...state.todos ];
			var index = todos.indexOf(selected);
			
			if(todos[index].selected) {
				todos[index] = { text: todos[index].text }
			}else {
				todos[index] = { text: todos[index].text, selected: true }
			}

			dataSource = state.dataSource.cloneWithRows(todos);
			return {
				...state,
				...action,
				todos,
				dataSource
			}
		}
	}	

	return {
		...state
	}
}