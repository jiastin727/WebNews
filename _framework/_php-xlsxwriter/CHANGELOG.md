# Changelog
All notable changes to this project will be documented in this file.

=======
## [v1.3.1] - 2022-08-17
### Added
- Added `FileWriter` and `XLSXBuilder` classes
- Added new constructor parameter into `Export` class (`useTempFiles` as a boolean variable)
- Added `examples/example_huge_data.php` as a new example

### Changed
- Modify `Export` class to use `XLSXBuilder` class when generating output
- Modify `setEncoding` function in `Export` class: Cannot modify the encoding if `useTempFiles` is `true`
- Modify `SharedStrings` and `Sheet` classes to use `FileWriter` to store data if `useTempFiles` is `true`

## [v1.3] - 2022-05-19
### Added
- Support Pie Chart
  - Added `PieChart` class

## [v1.2] - 2022-05-12
### Changed
- Modify `LineChart` and `Line` classes to support X axis
- Add parameter type into `getXML` function in `LineChart` and `BarChart` classes

## [v1.1] - 2022-05-11
### Added
- Support Bar Chart
  - Added `BarChart` and `Bar` classes

### Changed
- Fixed `double` and `float` type in `Sheet` class

## [v1.0] - 2022-05-09
### Added