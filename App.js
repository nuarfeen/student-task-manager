import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const initialTasks = [
  { id: 1, title: 'Review lecture notes', course: 'Computer Science', due: 'Today, 4:00 PM', done: false, color: '#6C63FF' },
  { id: 2, title: 'Finish wireframe concepts', course: 'UI / UX Design', due: 'Tomorrow, 10:00 AM', done: false, color: '#FF8A65' },
  { id: 3, title: 'Read chapter 5', course: 'Business Studies', due: 'Friday, 8:00 PM', done: true, color: '#37B37E' },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [addError, setAddError] = useState('');
  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const activeTasks = useMemo(() => tasks.filter((task) => !task.done), [tasks]);

  const toggleTask = (id) => setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  const addTask = () => {
    const title = newTask.trim();
    if (!title) {
      setAddError('Type your task first, then tap Add.');
      return;
    }
    setTasks((currentTasks) => [{ id: Date.now(), title, course: 'Personal task', due: 'Added just now', done: false, color: '#19A7CE' }, ...currentTasks]);
    setNewTask('');
    setAddError('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>THURSDAY, 1 OCTOBER</Text>
            <Text style={styles.greeting}>Good morning, Alex</Text>
            <Text style={styles.subtitle}>Let's make today productive.</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressCopy}>
            <Text style={styles.cardEyebrow}>WEEKLY PROGRESS</Text>
            <Text style={styles.progressTitle}>{progress}% completed</Text>
            <Text style={styles.progressHint}>{completed} of {tasks.length} tasks finished</Text>
          </View>
          <View style={styles.progressRing}><Text style={styles.ringText}>{progress}%</Text></View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s focus</Text>
          <Text style={styles.count}>{activeTasks.length} remaining</Text>
        </View>

        <View style={styles.addRow}>
          <TextInput value={newTask} onChangeText={(value) => { setNewTask(value); setAddError(''); }} onSubmitEditing={addTask} returnKeyType="done" placeholder="Type a task, then tap Add" placeholderTextColor="#9CA3AF" style={styles.input} />
          <Pressable accessibilityRole="button" accessibilityLabel="Add task" onPress={addTask} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}><Text style={styles.addButtonText}>+</Text><Text style={styles.addButtonLabel}>Add</Text></Pressable>
        </View>
        {!!addError && <Text style={styles.addError}>{addError}</Text>}

        {tasks.map((task) => (
          <Pressable key={task.id} onPress={() => toggleTask(task.id)} style={({ pressed }) => [styles.taskCard, pressed && styles.pressed]}>
            <View style={[styles.taskAccent, { backgroundColor: task.color }]} />
            <View style={[styles.checkbox, task.done && { backgroundColor: task.color, borderColor: task.color }]}>{task.done && <Text style={styles.check}>✓</Text>}</View>
            <View style={styles.taskInfo}>
              <Text style={[styles.taskTitle, task.done && styles.doneText]}>{task.title}</Text>
              <Text style={styles.taskMeta}>{task.course}  •  {task.due}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>✦</Text>
          <View style={{ flex: 1 }}><Text style={styles.tipTitle}>Small steps, big results</Text><Text style={styles.tipText}>Complete one task to keep your momentum going.</Text></View>
        </View>
        <Text style={styles.footer}>Tap any task to mark it complete</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FC' },
  container: { padding: 22, paddingBottom: 38 },
  header: { backgroundColor: '#171A3B', marginHorizontal: -22, marginTop: -22, padding: 28, paddingTop: 34, paddingBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  eyebrow: { color: '#A9ACD2', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  greeting: { color: '#FFFFFF', fontSize: 27, fontWeight: '800', marginBottom: 5 },
  subtitle: { color: '#C8CAE3', fontSize: 14 },
  avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  progressCard: { backgroundColor: '#6C63FF', borderRadius: 22, marginTop: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#6C63FF', shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  progressCopy: { flex: 1 }, cardEyebrow: { color: '#D9D7FF', fontSize: 10, fontWeight: '800', letterSpacing: 1.3, marginBottom: 8 },
  progressTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', marginBottom: 4 }, progressHint: { color: '#E4E2FF', fontSize: 13 },
  progressRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 6, borderColor: '#A7A1FF', borderTopColor: '#FFF', alignItems: 'center', justifyContent: 'center' }, ringText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 13 }, sectionTitle: { color: '#171A3B', fontSize: 20, fontWeight: '800' }, count: { color: '#6C63FF', fontSize: 13, fontWeight: '700' },
  addRow: { flexDirection: 'row', gap: 10, marginBottom: 5 }, input: { flex: 1, backgroundColor: '#FFF', borderRadius: 14, paddingHorizontal: 16, height: 52, fontSize: 14, color: '#171A3B', borderWidth: 1, borderColor: '#E9EAF2' }, addButton: { width: 70, height: 52, borderRadius: 14, backgroundColor: '#171A3B', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 3 }, addButtonText: { color: '#FFF', fontSize: 25, fontWeight: '300', marginTop: -2 }, addButtonLabel: { color: '#FFF', fontSize: 12, fontWeight: '800' }, addError: { color: '#D14343', fontSize: 12, marginBottom: 10, marginLeft: 4 },
  taskCard: { backgroundColor: '#FFF', borderRadius: 17, minHeight: 78, marginBottom: 12, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: '#EFF0F5', shadowColor: '#172044', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 }, taskAccent: { width: 5, height: '100%' }, checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: '#D9DBE6', marginHorizontal: 14, alignItems: 'center', justifyContent: 'center' }, check: { color: '#FFF', fontWeight: '800', fontSize: 15 }, taskInfo: { flex: 1, paddingVertical: 14 }, taskTitle: { color: '#25283F', fontSize: 15, fontWeight: '700', marginBottom: 6 }, doneText: { textDecorationLine: 'line-through', color: '#9CA3AF' }, taskMeta: { color: '#9296A8', fontSize: 11.5 }, chevron: { color: '#B8BBC8', fontSize: 26, marginRight: 15, marginLeft: 8 },
  tipCard: { backgroundColor: '#FFF5E9', borderRadius: 17, padding: 17, flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 10 }, tipIcon: { backgroundColor: '#FFE0B2', color: '#D9822B', width: 35, height: 35, borderRadius: 12, textAlign: 'center', textAlignVertical: 'center', fontSize: 20 }, tipTitle: { color: '#754518', fontWeight: '800', fontSize: 14, marginBottom: 4 }, tipText: { color: '#A66C37', fontSize: 12, lineHeight: 17 }, footer: { textAlign: 'center', color: '#A6A9B7', fontSize: 11, marginTop: 24 }, pressed: { opacity: 0.75 },
});
