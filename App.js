Ext.define('PIBoard', {
	extend: 'Rally.app.App',
	componentCls: 'app',
	launch: function() {
		typeComboBox = this.add({
			xtype: 'rallyportfolioitemtypecombobox',
			listeners: {
				change: function(combobox) {
					// console.log(typeComboBox.getRecord());
					piType = typeComboBox.getRecord().get('TypePath');
//
// Edit piFields to add fields to cards
//
					var piFields = ['PercentDoneByStoryPlanEstimate', 'Parent', 'Discussion'];
//
// Special condition, lowest level PI has the ability to show a decoration for stories on the card
					if (typeComboBox.getRecord().get('Ordinal') === 0) piFields.push('UserStories');
					this._doBoard(piType, piFields);
				},
				scope: this
			}
		});
	},
	_doBoard: function(pitype, piFields) {
		if (this.piBoard) {
			this.piBoard.destroy();
		}
		if (this.addNew) {
			this.addNew.destroy();
		}
		this.addNew = this.add({
			xtype: 'rallyaddnew',
			recordTypes: [pitype],
			ignoredRequiredFields: ['Name', 'Project'],
			listeners: {
				create: function(addNew, record) {
// callback to do something on add
				}
			},
			showAddWithDetails: true
		});
		this.piBoard = this.add({
			xtype: 'rallycardboard',
			types: pitype,
//
// Edit 'State' to change the column field (must be type pull-down or reference object (release, iteration, owner)
//
			attribute: 'State',
			context: this.getContext(),
			enableRanking: true,
//
// Uncomment and set field to add swim lanes
//			rowConfig: {
//				field: 'Owner'
//			},
			cardConfig: {
				editable: true,
				showIconsAndHighlightBorder: true,
				showReadyIcon: true,
				showBlockedIcon: true,
				showColorIcon: true,
				showPlusIcon: true,
				showGearIcon: true,
				fields: piFields
			}

		});
	}
});
