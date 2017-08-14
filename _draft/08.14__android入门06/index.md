---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

一些UI组件的使用：spinner，alert，datepicker, timepicker。

<!-- more -->

# Spinner
选择框：
```xml
// layout.xml
<Spinner
    android:id="@+id/label_spinner"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">
</Spinner>

// strings.xml
<string-array name="labels_array">
    <item>Home</item>
    <item>Work</item>
    <item>Mobile</item>
    <item>Other</item>
</string-array>
```

`MainActivity`需要继承`AdapterView.OnItemSelectedListener`:

```kotlin
class MainActivity : AppCompatActivity(), AdapterView.OnItemSelectedListener {
    var mSpinnerLabel = ""

    override fun onNothingSelected(p0: AdapterView<*>?) { 
        // 没选中item时
    }

    // 主要在这里实现选中之后的逻辑
    override fun onItemSelected(p0: AdapterView<*>, p1: View, p2: Int, p3: Long) {
        mSpinnerLabel = p0.getItemAtPosition(p2).toString()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // spinner 绑定监听
        label_spinner.setOnItemSelectedListener(this)

        // 新建一个adapter绑在spinner上
        // simple_spinner_item和simple_spinner_dropdown_item是默认的组件，也可以用自定义的
        val adapter = ArrayAdapter.createFromResource(this, R.array.labels_array, android.R.layout.simple_spinner_item)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        label_spinner.setAdapter(adapter)
    }
}
```

# Alert
alert不需要在layout中写东西，可以由一个button的onclick事件来触发弹出一个：
```kotlin
// 点击按钮后进到这里
fun onClickShowAlert(view: View) {
    // 新建一个Alert
    val myAlertBuilder = AlertDialog.Builder(this)
    myAlertBuilder.setTitle("Alert")
    myAlertBuilder.setMessage("Click OK to continue, or Cancel to stop:")

    myAlertBuilder.setPositiveButton("OK") { dialog, which ->
        // 点确定后
        Toast.makeText(applicationContext, "Pressed OK", Toast.LENGTH_SHORT).show()
    }

    myAlertBuilder.setNegativeButton("Cancel") { dialog, which ->
        // 点取消后
        Toast.makeText(applicationContext, "Pressed Cancel", Toast.LENGTH_SHORT).show()
    }

    // 显示alert
    myAlertBuilder.show()
}
```

# DatePicker, TimePicker
先简单写一个主页面：
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context="tech.llc.social_dating.MainActivity"
    android:orientation="vertical">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Choose the date and time: "
        />

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/button_date"
            android:layout_marginTop="12dp"
            android:text="Date"
            android:onClick="showDatePickerDialog"
            />

        <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/button_time"
            android:layout_marginTop="12dp"
            android:layout_alignBottom="@id/button_date"
            android:layout_toRightOf="@id/button_date"
            android:text="Time"
            android:onClick="showTimePickerDialog"
            />

    </RelativeLayout>

</LinearLayout>
```

点`File > New > Fragment > Fragment(Blank)`新建一个fragment，三个勾都可以去掉，继承一个DialogFragment:
```kotlin
import android.app.DatePickerDialog
import android.app.Dialog
import java.util.Calendar
import android.os.Bundle
import android.support.v4.app.DialogFragment
import android.support.v4.app.Fragment
import android.widget.DatePicker

class DatePickerFragment : DialogFragment(), DatePickerDialog.OnDateSetListener {

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val c = Calendar.getInstance()
        val year = c.get(Calendar.YEAR)
        val month = c.get(Calendar.MONTH)
        val day = c.get(Calendar.DAY_OF_MONTH)

        return DatePickerDialog(activity, this, year, month, day)
    }

    override fun onDateSet(view: DatePicker?, year: Int, month: Int, day: Int) {
        val activity = activity as MainActivity
        activity.processDatePickerResult(year, month, day)
    }
}
```

同理写一个TimeFragment:
```kotlin
import android.app.Dialog
import android.app.TimePickerDialog
import java.util.Calendar
import android.os.Bundle
import android.support.v4.app.DialogFragment
import android.support.v4.app.Fragment
import android.text.format.DateFormat
import android.widget.TimePicker

class TimePickerFragment : DialogFragment(), TimePickerDialog.OnTimeSetListener {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val c = Calendar.getInstance()
        val hour = c.get(Calendar.HOUR_OF_DAY)
        val minute = c.get(Calendar.MINUTE)

        return TimePickerDialog(activity, this, hour, minute, DateFormat.is24HourFormat(activity))
    }

    override fun onTimeSet(view: TimePicker, hourOfDay: Int, minute: Int) {
        val activity = activity as MainActivity
        activity.processTimePickerResult(hourOfDay, minute)
    }

}
```

再在MainActivity里添加这两个dialog：
```kotlin
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun showDatePickerDialog(v: View) {
        val newFragment = DatePickerFragment()
        newFragment.show(supportFragmentManager, getString(R.string.date_picker))
    }

    fun showTimePickerDialog(view: View) {
        val newFragment = TimePickerFragment()
        newFragment.show(supportFragmentManager, getString(R.string.time_picker))
    }

    // 选中date后的回调
    fun processDatePickerResult(year: Int, month: Int, day: Int) {
        val month_string = Integer.toString(month + 1)
        val day_string = Integer.toString(day)
        val year_string = Integer.toString(year)
        // Assign the concatenated strings to dateMessage.
        val dateMessage = month_string + "/" + day_string + "/" + year_string
        Toast.makeText(this, "date:" + dateMessage,
                Toast.LENGTH_SHORT).show()
    }

    // 选中time后的回调
    fun processTimePickerResult(hourOfDay: Int, minute: Int) {
        val hour_string = Integer.toString(hourOfDay)
        val minute_string = Integer.toString(minute)
        val timeMessage = hour_string + ":" + minute_string
        Toast.makeText(this, "time: " + timeMessage,
                Toast.LENGTH_SHORT).show()
    }
}
```

# 用Image view当button
